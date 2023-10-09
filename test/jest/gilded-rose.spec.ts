import { Item, GildedRose } from '@/gilded-rose';

const testItemName = "item name"

// TODO - set up tests to run on commit
describe('Gilded Rose', () => {
  
  it('should create a new item with default values', () => {
    const gildedRose = new GildedRose([new Item(testItemName, 0, 0)]);

    const item = gildedRose.items[0];

    expect(item.name).toBe(testItemName);
    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(0);
  });

  it('should lower the item quality & sell in value after a day', () => {
    const gildedRose = new GildedRose([new Item(testItemName, 1, 1)]);
    const items = gildedRose.updateQuality();

    const item = items[0];
    expect(item.quality).toBe(0);
    expect(item.sellIn).toBe(0);
  });

  it('should lower quality twice as fast once sell date has passed', () => {
    const gildedRose = new GildedRose([new Item(testItemName, 0, 5)]);
    const items = gildedRose.updateQuality();

    const item = items[0];
    expect(item.quality).toBe(3);
  });

  it('should not lower the quality of an item to a negative', () => {
    const gildedRose = new GildedRose([new Item(testItemName, 0, 0)]);
    const items = gildedRose.updateQuality();

    const item = items[0];
    expect(item.quality).toBe(0);
  });

  it('should increase the value of Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 10)]);
    const items = gildedRose.updateQuality();

    const item = items[0];
    expect(item.quality).toBe(11);
    expect(item.sellIn).toBe(0);
  });

  it('should not increase the value of an item over 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.quality).toBe(50);
  });

  it('should not decrease the value of a legendary item', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.quality).toBe(80);
  });

  it('should increase backstage passes value by 2 when there are 10 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 30)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.quality).toBe(32);
  });

  it('should increase backstage passes value by 3 when there are 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 30)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.quality).toBe(33);
  });

  it('should decrease backstage passes value to 0 when concert has finished', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 30)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.quality).toBe(0);
  });

  it('should decrease conjured items twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 4, 20)]);
    const items = gildedRose.updateQuality();
    const item = items[0];
    expect(item.quality).toBe(18);
  });
});
