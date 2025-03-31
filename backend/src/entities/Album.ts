import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Photo } from './Photo';

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    title: string | undefined;

    @ManyToOne(() => User, (user) => user.albums)
    user: User | undefined;

    @OneToMany(() => Photo, (photo) => photo.album)
    photos: Photo[] | undefined;
}