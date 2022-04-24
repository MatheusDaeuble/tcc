import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Course from '@modules/courses/database/entities/Course';
import { GENDERS } from '../repositories/types/enums/genders';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  email: string;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ name: 'gender', type: 'varchar' })
  gender: GENDERS;

  @Column({ name: 'course_id', type: 'int', nullable: true })
  courseId: number | null;

  @ManyToOne(() => Course, course => course.users, {
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course | null;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default User;
