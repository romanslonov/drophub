import { Knex } from 'nestjs-knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 255).unique().index();
    table.string('name', 255).notNullable();
    table.integer('usage').notNullable();
    table.string('password', 255).notNullable();
  });

  await knex.schema.createTable('boards', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.integer('ownerId').unsigned().notNullable();
    table.boolean('starred').notNullable();
    // foreign key
    table.foreign('ownerId').references('users.id');
  });

  await knex.schema.createTable('files', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('size').notNullable();
    table.integer('ownerId').unsigned().notNullable();
    table.integer('boardId').unsigned().notNullable();
    // foreign keys
    table.foreign('ownerId').references('users.id');
    table.foreign('boardId').references('boards.id');
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('boards');
  await knex.schema.dropTableIfExists('files');
}
