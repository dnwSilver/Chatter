type InferActions<T>=T extends { [keys: string]: (...args: any[])=>infer U } ? U : never

export default InferActions
