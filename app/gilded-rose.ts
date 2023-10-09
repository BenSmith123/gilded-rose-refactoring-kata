
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
  return item.name === ItemName.AgedBrie || item.name === ItemName.BackStagePassesToConcert
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != ItemName.AgedBrie && this.items[i].name != ItemName.BackStagePassesToConcert) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != ItemName.SulfurasHandOfRagnaros) {
            if (isConjuredItem(this.items[i])) {
              this.items[i].quality = this.items[i].quality - 2
            } else {
              this.items[i].quality = this.items[i].quality - 1
            }
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == ItemName.BackStagePassesToConcert) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != ItemName.SulfurasHandOfRagnaros) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != ItemName.AgedBrie) {
          if (this.items[i].name != ItemName.BackStagePassesToConcert) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != ItemName.SulfurasHandOfRagnaros) {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
