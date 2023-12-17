function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

const inputDummy = {
    name: 'Huawei Test',
    email: 'huawei@gmail.com',
    no_hp: '94823932',
    address: 'Jakarta'
}

describe('Test Form Huawei', () => {
    jest.setTimeout(10000);
    beforeAll(async () => {
        await page.goto('http://localhost:8000')
    })
    
    it('Should Verify Input Form', async () => {
        await page.waitForSelector('input[name="name"]');
        await page.waitForSelector('input[name="email"]');
        await page.waitForSelector('input[name="no_hp"]');
        await page.waitForSelector('textarea[name="address"]');

        await page.type('input[name="name"]', inputDummy['name']);
        await page.type('input[name="email"]', inputDummy['email']);
        await page.type('input[name="no_hp"]', inputDummy['no_hp']);
        await page.type('textarea[name="address"]', inputDummy['address']);

        await page.click('button[id="save"]');

        await delay(2000);

        const el = await page.$('#content-data');
        const text = await page.evaluate(el => el.innerText, el);

        await expect(text).toContain(inputDummy['name']);
        await expect(text).toContain(inputDummy['email']);
        await expect(text).toContain(inputDummy['no_hp']);
        await expect(text).toContain(inputDummy['address']);
    })
})