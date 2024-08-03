export class CreateTodoDto {
  constructor(public readonly text: string) { }

  public static create(props: Record<string, any>): [string?, CreateTodoDto?] {
    const { text } = props
    if (!text) {
      return ['Missing todo text']
    }
    return [undefined, new CreateTodoDto(text)]
  }
}