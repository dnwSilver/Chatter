import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common'
import {Observable}                                                 from 'rxjs'
import {map}                                                        from 'rxjs/operators'
import {Stream}                                                     from 'stream'

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map(value=>{
        if(value instanceof Stream){
          return value
        }
        return recursivelyStripNullValues(value)
      }))
  }
}

function recursivelyStripNullValues(value: unknown): unknown {
  if(Array.isArray(value)){
    return value.map(recursivelyStripNullValues)
  }
  if(value!==null&& typeof value==='object'){
    return Object.fromEntries(
      Object.entries(value).map(([key, value])=>[key, recursivelyStripNullValues(value)])
    )
  }
  if(value!==null){
    return value
  }
}

