import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import {AppDataSource} from "./data-source";
import {Photo} from "./entities/Photo";
import {User} from "./entities/User";
import {Album} from "./entities/Album";
import { faker } from '@faker-js/faker';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize the database connection
AppDataSource.initialize()
    .then(async () => {
        console.log("✅ Database connected");

        // Seeding the database if empty
        await seedDB();

        // Users API
        app.get("/api/users", async (req, res) => {
            try {
                const users = await AppDataSource.getRepository(User).find({
                    relations: {
                        albums: true
                    }
                });
                // Return users with their albums
                res.json(users);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        app.get('/api/users/:id', async (req, res) => {
            const user = await AppDataSource.getRepository(User).find({
                where: [{ id: parseInt(req.params.id) }],
                relations: {
                    albums: true
                }
            });

            if(user) res.json(user);
            else res.status(404).json({ message: 'User not found' });
        })

        // Albums API
        app.get("/api/albums", async (req, res) => {
            const albums = await AppDataSource.getRepository(Album).find({
                relations: {
                    user: true,
                    photos: true
                }
            });
            res.json(albums);
        });

        app.get('/api/albums/:id', async (req, res) => {
            const album = await AppDataSource.getRepository(Album).findOne({
                where: [{ id: parseInt(req.params.id) }],
                relations: {
                    user: true,
                    photos: true
                }
            });
            if(album) res.json(album);
            else res.status(404).json({ message: 'Album not found' });
        });

        // Photos API
        app.get("/api/photos", async (req, res) => {
            const photos = await AppDataSource.getRepository(Photo).find({
                relations: {
                    album: true
                }
            });
            res.json(photos);
        });

        app.get('/api/photos/:id', async (req, res) => {
            const photo = await AppDataSource.getRepository(Photo).find({
                where: [{ id: parseInt(req.params.id) }],
                relations: {
                    album: true
                }
            });
            if(photo) res.json(photo);
            else res.status(404).json({ message: 'Photo not found' });
        });


        // @ts-ignore
        app.patch('/api/photos/:id', async (req, res) => {
            const photoRepo = AppDataSource.getRepository(Photo);
            const photo = await photoRepo.findOneBy({ id: parseInt(req.params.id) });
            if(!photo) return res.status(404).json({ message: 'Photo not found' });
            photo.title = req.body.title;
            //photo.url = req.body.url;
            await photoRepo.save(photo);
            res.json(photo);
        });

        app.listen(PORT, () => {
            console.log(`⚡️ Server is running at http://localhost:${PORT}`);
        });
    });

// Seed DB with fake data
const seedDB = async () => {
    const userRepo = AppDataSource.getRepository(User);
    const albumRepo = AppDataSource.getRepository(Album);
    const photoRepo = AppDataSource.getRepository(Photo);

    //const userCount = await userRepo.count();
    //if(userCount > 0) return; // Already seeded DB
    console.log('❗Seeding DB...');

    // Create 10 Users
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
        const user = new User();
        user.name = faker.person.fullName();
        user.username = faker.internet.username();
        user.email = faker.internet.email();
        users.push(await userRepo.save(user));
    }

    // Create 3-5 albums per user with 5-10 photos per album
    for (const user of users) {
        const albumCount = faker.number.int({ min: 3, max: 5 });
        for (let i = 0; i < albumCount; i++) {
            const album = new Album();
            album.title = faker.lorem.words();
            album.user = user;
            const savedAlbum = await albumRepo.save(album);

            const photo = new Photo();
            photo.title = faker.lorem.words();
            photo.url = faker.image.url();
            photo.album = savedAlbum;
            await photoRepo.save(photo);
        }
    }

    console.log('💯 DB seeded');
}