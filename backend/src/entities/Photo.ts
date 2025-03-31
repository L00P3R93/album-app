import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Album } from "./Album";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    title: string | undefined;

    @Column()
    url: string | undefined;

    @ManyToOne(() => Album, (album) => album.photos)
    album: Album | undefined;

    @Column()
    albumId: number | undefined
}
