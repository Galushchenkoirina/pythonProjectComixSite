from bs4 import BeautifulSoup
import requests
import data_book


cookies = {
    'landing': '%2Fcategory%2Fknigi%2F',
    '_ym_uid': '1731594600830182292',
    '_ym_d': '1731594600',
    '__utmc': '217105156',
    'shop_cart': 'c873ebfee798a32751c36c187757bc4a',
    'PHPSESSID': 'bqae796449kh9urjl43pdchcot',
    'referer': 'https%3A%2F%2Fwww.google.com%2F',
    '__utmz': '217105156.1732704460.17.6.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)',
    '_ym_isad': '2',
    '__utma': '217105156.964021005.1731594600.1732704460.1732717332.18',
    '__utmt': '1',
    '__utmb': '217105156.3.10.1732717332',
}

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    # 'Cookie': 'landing=%2Fcategory%2Fknigi%2F; _ym_uid=1731594600830182292; _ym_d=1731594600; __utmc=217105156; shop_cart=c873ebfee798a32751c36c187757bc4a; PHPSESSID=bqae796449kh9urjl43pdchcot; referer=https%3A%2F%2Fwww.google.com%2F; __utmz=217105156.1732704460.17.6.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _ym_isad=2; __utma=217105156.964021005.1731594600.1732704460.1732717332.18; __utmt=1; __utmb=217105156.3.10.1732717332',
    'Referer': 'https://comix.by/',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 OPR/114.0.0.0',
    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Opera";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

class Parser():
    links_to_parse = [
        'https://comix.by',
        'https://comix.by/category/knigi/',
        'https://comix.by/category/komiksy/',
        'https://comix.by/category/bestsellery/',
        'https://comix.by/category/ranobe/',
        'https://comix.by/category/manga/',
        'https://comix.by/category/artbuki-entsiklopedii/'
    ]

    data_client_imp = data_book.PostgresBook()
    url = 'https://comix.by'

    def book_link(self, url):
        response = requests.get(url, cookies=cookies, headers=headers)
        soup = BeautifulSoup(response.content, 'html.parser')
        book_items = []

        # Находим все элементы списка книг
        product_list = soup.find('ul', class_="thumbs product-list")
        if not product_list:
            print("Список книг не найден.")
            return book_items

        # Обрабатываем каждый элемент списка
        for quote in product_list.find_all('li', recursive=False):
            try:
                # Заголовок книги
                title_tag = quote.find('span', itemprop="name")
                title = title_tag.text.strip() if title_tag else "Неизвестное название"

                # Цена
                price_tag = quote.find('span', class_="price nowrap")
                if price_tag:
                    price_text = price_tag.text.split(',')[0].strip()  # Убираем лишние пробелы
                    try:
                        price = int(price_text)  # Пробуем преобразовать в целое число
                    except ValueError:
                        print(f"Ошибка преобразования цены: '{price_text}' не является корректным числом.")
                        price = 0  # Устанавливаем значение по умолчанию
                else:
                    price = 0  # Если тег не найден, устанавливаем цену в 0

                # Изображение
                img_tag = quote.find('img')
                imag = f"https://comix.by{img_tag['src']}" if img_tag and 'src' in img_tag.attrs else "Изображение отсутствует"

                # Ссылка на книгу
                link_tag = quote.find('a', href=True)
                link = f"{self.url}{link_tag['href']}" if link_tag else None

                # Парсим описание со страницы книги
                description = self.parse_description(link) if link else "Описание отсутствует"

                # Добавляем в список
                book_items.append((title, description, price, link, imag))
            except Exception as e:
                print(f"Ошибка обработки элемента: {e}")

        return book_items

    def parse_description(self, link):
        """Парсинг описания книги по ссылке"""
        try:
            response = requests.get(link, cookies=cookies, headers=headers)
            soup = BeautifulSoup(response.content, 'html.parser')
            desc_tag = soup.find('div', class_="description")
            return desc_tag.get_text(strip=True) if desc_tag else "Описание отсутствует"
        except Exception as e:
            print(f"Ошибка при парсинге описания: {e}")
            return "Ошибка описания"



    def save_to_postgres(self, book_items):
        connection = self.data_client_imp.get_connection()
        self.data_client_imp.create_book_table(connection)
        for item in book_items:
            self.data_client_imp.insert(connection, item[0], item[1], item[2], item[3], item[4])


    def run(self):
        book_items = []
        for link in Parser.links_to_parse:
            book_items.extend(self.book_link(link))
        self.save_to_postgres(book_items)

Parser().run()

# with open('book_parser_slider.txt', 'w', encoding='UTF-8') as f:
#     f.write(response.text)




