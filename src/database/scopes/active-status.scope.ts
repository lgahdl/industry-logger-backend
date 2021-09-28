export const ActiveStatusScope = (qb, alias) =>
  qb.andWhere(`${alias}.status = :status`, { status: 'active' });
