import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
  OneToMany,
  Collection,
} from "@mikro-orm/core";

import { User } from "./User";
import { ArtWorkImageProps } from "./types";
import { Comment } from './Comment'

@Entity({ tableName: "artWork" })
export class Artwork {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property({ type: "jsonb" })
  tags: string[];

  @Property({ type: "jsonb" })
  image!: ArtWorkImageProps[];

  @Property({ default: "" })
  description: string;

  @OneToMany("Like", "artwork")
  likes = new Collection<Like>(this);

  @OneToMany("Comment", "artwork")
  comments = new Collection<Comment>(this);

  @Property({ type: "jsonb", default: [] })
  views: number[];

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @ManyToOne()
  author!: User;
}

@Entity({ tableName: "like" })
export class Like {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Artwork)
  artwork!: Artwork;

  @ManyToOne()
  user!: User;
}
