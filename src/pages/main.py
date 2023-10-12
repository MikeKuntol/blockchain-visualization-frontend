from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase

# for security reasons
# you can store your database information in a separate file
uri = "neo4j+s://19b5ded5.databases.neo4j.io"
user = "neo4j"
password = "eS87GcULkCOLvQeqHzIiRtftod6AbfkzhPCcuOx_iUY"

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

driver = GraphDatabase.driver(uri, auth=(user, password))

@app.get("/")
async def mainpage():
    return ("ASD")

@app.get("/getGDBAddr")
async def funcTest():
    driver = GraphDatabase.driver(uri, auth=(user, password))
    gdb_address = driver.get_server_info().address
    driver.close()

    return gdb_address

@app.get("/graph_data")
async def get_graph_data():
    with driver.session() as session:
        # Query Neo4j for the data you need
        result = session.run("MATCH p=(source:wallet {addressId: '0x8d08aad4b2bac2bb761ac4781cf62468c9ec47b4'})-[:RECEIVED_FROM]->(target) return p;")
        neo4j_data = result.data()

    return {"data": neo4j_data}

