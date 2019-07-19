let server;
const config = require('config');
const request = require('supertest');
const testAuthToken = config.get('token');
const {Genre} =  require('../../models/schemas/genre');

describe('/api/genres', () => {
    beforeEach(() => {
        server = require('../../app');
    });

    afterEach(async () => {
        server.close();
        await Genre.remove({});
    });

    describe('GET /', () => {
        it('Should return a 200 response when getting all genres', async() =>{
            
            const res = await request(server).get('/api/genres').set('x-auth-token',testAuthToken);
            expect(res.status).toBe(200);
        });

        it('Should have a body size of 2', async()=>{
            await Genre.collection.insertMany([
                {name:'genre1'},
                {name:'genre2'}
            ]);

            const res = await request(server).get('/api/genres').set('x-auth-token',testAuthToken);
            expect(res.body.length).toBe(2);
        });

        it('Should return specific document when getting all genres',async()=>{
            await Genre.collection.insertMany([
                {name:'genre1'},
                {name:'genre2'}
            ]);

            const res = await request(server).get('/api/genres').set('x-auth-token',testAuthToken);
            expect(res.body.some(g => g.name == 'genre1')).toBeTruthy();
        })
    })
});