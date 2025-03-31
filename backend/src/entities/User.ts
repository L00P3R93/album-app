import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Album } from './Album';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    name: string | undefined;

    @Column({ unique: true })
    username: string | undefined;

    @Column({ unique: true })
    email: string | undefined;

    @OneToMany(() => Album, (album) => album.user)
    albums: Album[] | undefined;
}