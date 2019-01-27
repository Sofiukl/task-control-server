export class Response<T> {
    
    constructor() {}

    private error: boolean;
    private result: Array<T>;


    setError(error: boolean) {
        this.error = error;
    }
    getError(): boolean {
        return this.error;
    }
    setResult(result: Array<T>) {
        this.result = result;
    }
    getResult(): Array<T> {
        return this.result;
    }
}