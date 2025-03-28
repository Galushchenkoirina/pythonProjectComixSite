from bs4 import BeautifulSoup
import requests
import psycopg2
from psycopg2 import sql
from psycopg2 import Error
from abc import ABC, abstractmethod


class BookClient(ABC):
    @abstractmethod
    def get_connection(self):
        pass

    @abstractmethod
    def create_book_table(self, conn):
        pass

    @abstractmethod
    def get_items(self, conn):
        pass

    @abstractmethod
    def insert(self, conn, title, description, price, imag, link):
        pass

    def run_test(self):
        conn = self.get_connection()
        self.create_book_table(conn)
        items = self.get_items(conn)
        for item in items:
            print(item)
        conn.close()


class PostgresBook(BookClient):
    USER = 'postgres'
    PASSWORD = 'postgres'
    HOST = 'localhost'
    PORT = '5432'
    DATABASE = 'App'

    def get_connection(self):
        try:
            connection = psycopg2.connect(
                user=self.USER,
                password=self.PASSWORD,
                host=self.HOST,
                port=self.PORT,
                database=self.DATABASE
            )
            return connection
        except Error as e:
            print("Error while connecting to PostgreSQL", e)

    def create_book_table(self, conn):
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS comix1 (
                id serial PRIMARY KEY,
                title text,
                description text,
                price integer,
                imag text,
                link text
            )
            """
        )
        conn.commit()

    def get_items(self, conn):
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM comix1')
        return cursor.fetchall()

    def insert(self, conn, title, description, price, imag, link):
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO comix1 (title, description, price, imag, link) VALUES (%s, %s, %s, %s, %s)",
            (title, description, price, imag, link)
        )
        conn.commit()


data_client = PostgresBook()
data_client.run_test()