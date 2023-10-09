
import { ItemName } from "./item-names";

// DO NOT ALTER ITEMS CLASS
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

type NullibleItem = Item | undefined

const isConjuredItem = (item: Item): boolean => {
  return item.name.toLowerCase().includes('conjured');
}

const isLegendaryItem = (item: Item): boolean => {
  return item.name === ItemName.SulfurasHandOfRagnaros;
}

const shouldItemValueIncrease = (item: Item): boolean => {
  return item.name === ItemName.AgedBrie || item.name == ItemName.BackStagePassesToConcert
}

const increaseItemQuality = (item: Item): NullibleItem => {
  if (item.quality >= 50) return;

  item.quality++;
  return item;
}

// TODO - fix param (negative or positive number?)
const decreaseItemQuality = (item: Item, decreaseAmount = 1): NullibleItem => {
  if (item.quality <= 0 || isLegendaryItem(item)) return;

  item.quality -= decreaseAmount;
  return item;
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    
    for (let i = 0; i < this.items.length; i++) {

      const item = this.items[i]

      if (!shouldItemValueIncrease(item)) {
        if (isConjuredItem(item)) {
          decreaseItemQuality(item, 2); // fix param (see function)
        } else {
          decreaseItemQuality(item);
        }
      } else {
        increaseItemQuality(item)
        if (item.name == ItemName.BackStagePassesToConcert) {
          if (item.sellIn < 11) {
            increaseItemQuality(item)
          }
          if (item.sellIn < 6) {
            increaseItemQuality(item)
          }
        }
      }
      if (!isLegendaryItem(item)) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != ItemName.AgedBrie) {
          if (item.name != ItemName.BackStagePassesToConcert) {
            decreaseItemQuality(item);
          } else {
            item.quality = item.quality - item.quality
          }
          continue;
        } 

        increaseItemQuality(item)
      }
    }

    return this.items;
  }
}
