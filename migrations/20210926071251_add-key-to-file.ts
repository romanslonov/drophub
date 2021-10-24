import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('files', (table) => {
    table.string('key', 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('files', (table) => {
    table.dropColumn('key');
  });
}
