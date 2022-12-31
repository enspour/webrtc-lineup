export default {
    port: process.env.PORT || 3040,
    environment: process.env.ENVIRONMENT || "development",
    
    cassandraUser: process.env.CASSANDRA_USER || "",
    cassandraPassword: process.env.CASSANDRA_PASS || "",
    cassandraKeyspace: process.env.CASSANDRA_KEYSPACE || "lineupdb",
    cassandraURL: process.env.CASSANDRA_URL || "localhost"
}