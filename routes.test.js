const request = require("supertest");
const app = require("./app");
const items = require('./fakeDb');

process.env.NODE_ENV = "test";
let candy = {
    name: "Chocolatebar",
    price: "4.99"
}
beforeEach(function () {
    items.push(candy);
})
afterEach(function () {
    items.length = 0;
})

describe("GET /items", function () {
    test("Gets all items", async function () {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{
            name: "Chocolatebar",
            price: "4.99"
        }])
    })
})


describe("POST /items", function () {
    test("Create an item", async function () {
        const resp = await request(app).post('/items').send(
            {
                name: "Popsicle",
                price: 1.45
            }
        );
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            "added": {
                name: "Popsicle",
                price: 1.45
            }
        });
        expect(resp.body.added).toHaveProperty("name");
        expect(resp.body.added).toHaveProperty("price");
        expect(resp.body.added.name).toEqual("Popsicle");
        expect(resp.body.added.price).toEqual(1.45);

    });
    test("Respond with 400 due to missing price", async () => {
        const resp = await request(app).post('/items').send({
            name: "Waffles"
        });
        expect(resp.statusCode).toBe(400);
    });
    test("Respond with 400 due to item already existing", async () => {
        const res = await request(app).post('/items').send({
            name: "Chocolatebar",
            price: "4.99"
        });
        expect(res.statusCode).toBe(400);
    });
})

describe("PATCH /items/Chocolatebar", function () {
    test("Update an item", async function () {
        const resp = await request(app).patch('/items/Chocolatebar').send(
            {
                name: "Chocolate_Bar",
                price: "4.99"
            }
        );
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            "updated": {
                name: "Chocolate_Bar",
                price: "4.99"
            }
        });
        expect(resp.body.updated).toHaveProperty("name");
        expect(resp.body.updated).toHaveProperty("price");
        expect(resp.body.updated.name).toEqual("Chocolate_Bar");
        expect(resp.body.updated.price).toEqual("4.99");

    })
    test("Respond with 400 due to item already existing", async () => {
        const res = await request(app).patch('/items/Chocolate_Bar').send({
            name: "Chocolate_Bar",
            price: "4.99"
        });
        expect(res.statusCode).toBe(400);
    });

})


describe("DELETE /items/Chocolate_Bar", function () {
    test("Delete an item", async function () {
        const resp = await request(app).delete('/items/Chocolate_Bar');
        expect(resp.body).toEqual({ message: "Deleted" });
        expect(resp.statusCode).toBe(200);
    })
    test("Respond with 400 due to item not found", async () => {
        const res = await request(app).delete('/items/fakeItem');
        expect(res.body).toEqual({"error": {"message": "Item not found.", "status": 404}});
    });

})