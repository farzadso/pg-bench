# Prisma 💎 vs. TypeORM {} Benchmark

> This project aims to compare the performance of two popular Object-Relational Mapping (ORM) libraries, Prisma and TypeORM, specifically in terms of data insertion and reading operations.

## 🌟 Introduction

Prisma and TypeORM are widely used ORM solutions that simplify database interactions in Node.js applications. This benchmark focuses on evaluating their performance when dealing with data insertion and retrieval tasks.

## ⚙️ Setup

To run this benchmark, follow these steps:

1. Clone the repository: `git clone git@github.com:farzadso/pg-bench.git`

2. Install dependencies: `pnpm install`

3. Configure your database connection settings for both Prisma and TypeORM.

4. Run the benchmark script.

```bash
pnpm benchmark:prisma
or
pnpm benchmark:typeorm
```

## 🗃️ Database Configuration

### Prisma

1. Create the following file: `src/prisma/.env`.

2. Update the relevant environment variables based on your database configuration.

3. Add the following content if you're using the docker compose file in the project:

    ```bash
    DATABASE_URL=postgresql://benchmark-api-db:benchmark-api-db@localhost:9120/benchmark-api-db
    ```

4. Run the following command to establish the link between `schema.prisma` and the `.env` file:

    ```bash
    pnpx prisma generate
    ```

5. Run the following command to apply the migrations:

    ```bash
    pnpx prisma migrate dev
    ```

### TypeORM

To change the database configuration edit the values in the `src/data-source.ts` file.

## 🔍 Benchmark Details

The benchmark consists of four main scenarios:

1. Creating many users

2. Creating users in a stress scenario

3. Finding all users

4. Finding users that match a given condition

## 📈 Results

The benchmark results will be displayed in the console after running each test. It will include metrics such as execution time.

## 🎯 Conclusion

Based on the benchmark results, a comprehensive analysis of Prisma and TypeORM's performance in terms of data insertion and reading operations can be made. This information can help developers make informed decisions when choosing an ORM for their projects.

## 👥 Contributing

Contributions are welcome! If you have suggestions or would like to add more tests to this benchmark suite, please feel free to submit a pull request.

## 📜 License

This project is licensed under the MIT License.
