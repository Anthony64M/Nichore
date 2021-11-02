import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { Artwork } from "./Artwork";
import { User } from "./User";

@Entity({ tableName: "comment" })
export class Comment {
  @PrimaryKey()
  id!: number;

  @Property()
  message!: string;

  @ManyToOne(() => Artwork)
  artwork!: Artwork;

  @ManyToOne()
  user!: User;
}
