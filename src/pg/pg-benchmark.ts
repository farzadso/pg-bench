import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { userGroups } from "../userGroups";

const pool = new Pool({
  host: "localhost",
  user: "benchmark-api-db-pg",
  password: "benchmark-api-db-pg",
  port: 9124,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const createManyUsers = async (count: number) => {
  const fCount = count.toLocaleString("en-US");

  const fakeUsers = Array.from({ length: count }, () => {
    const user = {
      id: uuidv4(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      group: userGroups[Math.floor(Math.random() * userGroups.length)],
    };
    return `('${user.id}', '''${user.name.replace("'", "")}''', '${
      user.email
    }', '${user.group}', '${user.password}')`;
  });

  console.time(`Create(many) ${fCount} users - PG`);
  await pool.query(`INSERT INTO "User" VALUES ${fakeUsers.join(",")}`);
  console.timeEnd(`Create(many) ${fCount} users - PG`);
};

const createUsersIntensive = async (count: number) => {
  const fakeUsers = Array.from({ length: count }, () => ({
    id: uuidv4(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    group: userGroups[Math.floor(Math.random() * userGroups.length)],
  }));

  const fakeUsersQuery = fakeUsers.map((user) => {
    return `('${user.id}', '''${user.name.replace("'", "")}''', '${
      user.email
    }', '${user.group}', '${user.password}')`;
  });

  console.time(`Create users intensive - PG`);

  await pool.query(`INSERT INTO "User" VALUES ${fakeUsersQuery.join(",")}`);

  for (const user of fakeUsers) {
    const fakeUserAddresses = Array.from({ length: count }, () => {
      const address = {
        id: uuidv4(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        country: faker.address.country(),
      };

      return `('${address.id}', '${address.address.replace(
        /'/g,
        "''"
      )}', '${address.city.replace(/'/g, "''")}', '${address.state.replace(
        /'/g,
        "''"
      )}', '${address.zip}', '${address.country.replace(/'/g, "''")}', '${
        user.id
      }')`;
    });
    await pool.query(
      `INSERT INTO "UserAddresses" (id, address, city, state, zip, "country", "userId") VALUES ${fakeUserAddresses.join(
        ","
      )}`
    );
  }
  console.timeEnd(`Create users intensive - PG`);
};

const findUsers = async () => {
  console.time("Find users - PG");
  await pool.query('SELECT * FROM "User"');
  console.timeEnd("Find users - PG");
};

const findByGroup = async () => {
  console.time("Find users by group - PG");
  await pool.query(`SELECT * FROM "User" WHERE "group" = 'guest'`);
  console.timeEnd("Find users by group - PG");
};

async function main() {
  await createManyUsers(Number(process.argv[2]) || 100);
  await createUsersIntensive(Number(process.argv[2]) || 100);
  await findUsers();
  await findByGroup();
  process.exit(process.exitCode);
}

main();
