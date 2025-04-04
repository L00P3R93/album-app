import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { Photo } from './Photo';

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { length: 255 })
    title!: string;

    @ManyToOne(() => User, (user) => user.albums)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column('integer')
    user_id!: number;

    @OneToMany(() => Photo, (photo) => photo.album, { cascade: true })
    photos!: Photo[];
}