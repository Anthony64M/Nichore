import { Migration } from '@mikro-orm/migrations';

export class Migration20211008030524 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "artWork" drop constraint if exists "artWork_views_check";');
    this.addSql('alter table "artWork" alter column "views" type jsonb using ("views"::jsonb);');
    this.addSql('alter table "artWork" alter column "views" drop default;');

    this.addSql('drop table if exists "artworkCollection" cascade;');
  }

}
