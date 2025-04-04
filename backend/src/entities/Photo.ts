import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Album } from "./Album";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { length: 255 })
    title!: string;

    @Column('text')
    url!: string;

    @ManyToOne(() => Album, (album) => album.photos)
    @JoinColumn({ name: 'album_id' })
    album!: Album;

    @Column('integer')
    album_id!: number
}
