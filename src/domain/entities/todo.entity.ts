export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null,
  ) { }

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(obj: Record<string, any>): TodoEntity {
    const { id, text, completedAt } = obj;

    if (!id) throw new Error('Id is required');
    if (!text) throw new Error('Text is required');

    let newCompletedAt: Date | null = null;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw new Error('Invalid completedAt');
      }
    }

    return new TodoEntity(id, text, newCompletedAt);
  }
}