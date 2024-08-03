export class UpdateTodoDto {
  constructor(
    public readonly id?: string,
    public readonly text?: string,
    public readonly completedAt?: Date,
  ) { }

  get values() {
    const returnObject: Record<string, any> = {}
    if (this.text) returnObject.text = this.text
    if (this.completedAt) returnObject.completedAt = this.completedAt

    return returnObject
  }

  public static create(props: Record<string, any>): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props

    let newCompletedAt: Date | undefined = completedAt

    if (!id || isNaN(parseInt(id))) {
      return ['Id must be a number']
    }

    if (completedAt) {
      newCompletedAt = new Date(completedAt)
      if (newCompletedAt.toString() === 'Invalid Date') {
        return ['Invalid completedAt']
      }
    }

    return [undefined, new UpdateTodoDto(id, text, completedAt)]
  }
}