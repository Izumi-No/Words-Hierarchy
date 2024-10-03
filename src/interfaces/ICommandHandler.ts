
// biome-ignore lint/suspicious/noExplicitAny: this is an generic interface
export interface ICommandHandler<T = any> {
    handleCommand(args: string[], ...rest: T[]): void;
}