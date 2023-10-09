
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

const isConjuredItem = (item: Item) => {
  return item.name.toLowerCase().includes('conjured')
}

const shouldItemValueIncrease = (item: Item) => {
  return item.name === ItemName.AgedBrie || item.name == ItemName.BackStagePassesToConcert
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
        if (item.quality > 0) {
          if (item.name != ItemName.SulfurasHandOfRagnaros) {
            if (isConjuredItem(item)) {
              item.quality = item.quality - 2
            } else {
              item.quality = item.quality - 1
            }
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
          if (item.name == ItemName.BackStagePassesToConcert) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
          }
        }
      }
      if (item.name != ItemName.SulfurasHandOfRagnaros) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != ItemName.AgedBrie) {
          if (item.name != ItemName.BackStagePassesToConcert) {
            if (item.quality > 0) {
              if (item.name != ItemName.SulfurasHandOfRagnaros) {
                item.quality = item.quality - 1
              }
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
