import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

export class BaseEntity {
  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @BeforeInsert()
  updateCreatedAt() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
  @BeforeUpdate()
  updateUpdatedAt() {
    this.updated_at = new Date();
  }
}
