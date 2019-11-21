from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium import webdriver
import json

chrome_path = r"C:\Users\Nokur\Downloads\chromedriver_win32\chromedriver.exe"


driver = webdriver.Chrome(chrome_path)
driver.implicitly_wait(100)
driver.get(
    "https://www.eckersleys.com.au/atelier-interactive-artists-acrylic-paints-80ml")


driver.find_element_by_xpath("""//*[@id="bundle-slide"]""").click()
delay = 3  # seconds

try:
    myElem = WebDriverWait(driver, delay).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'control')))
    print("Working")
    products = driver.find_elements_by_class_name("selection-item-area")
    for product in products:
        names = product.find_element_by_class_name("product-item-name")
        #JSONObject names = (JSONObject) productNames
        print(names.text) 

        prices = product.find_element_by_class_name("price")

        print(prices.text)

        

except TimeoutException:
    print('Not Working')
