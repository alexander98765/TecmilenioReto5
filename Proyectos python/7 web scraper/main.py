'''
Module to scrap mercado libre page, get results and export them to excel format.
It uses selenium libray for automation.
It uses pandas to join results and export to excel format
'''

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import pandas as pd
import time 

def start_search():
    '''
    Function to perform main search flow
    '''
    #Get search criterioa from user
    search_criteria =  input("Que producto deseas buscar\n")

    if isEmpty(search_criteria):
        print("Por favor, ingresa un producto para iniciar la búsqueda")
    else:
        #Create chrome instance
        driver = webdriver.Chrome()
        #Open ML page
        driver.get("https://www.mercadolibre.com.mx/")
        #Give chrome time to load
        time.sleep(15)
        #Get search textbox instance
        search_input = driver.find_element(By.CLASS_NAME, "nav-search-input")
        search_input.clear()
        #Set search parameter
        search_input.send_keys(search_criteria)
        #Send enter key to start search
        search_input.send_keys(Keys.RETURN)

        #Give time to load
        time.sleep(4)

        #Get products names from page
        products_title = driver.find_elements(By.XPATH, "//a[@class='ui-search-link__title-card ui-search-link']")
        products_title = [ title.text for title in products_title ]

        print("title")
        print(products_title)
        print(len(products_title))

        #Give time to load
        time.sleep(2)

        #Get products prices from page
        products_prices = driver.find_elements(By.XPATH, "//div[@class='ui-search-item__group ui-search-item__group--price ui-search-item__group--price-grid-container']//div[@class='ui-search-price ui-search-price--size-medium']//div[@class='ui-search-price__second-line']//span[1]//span[2]")
        products_prices = [ price.text for price in products_prices ]

        print("price")
        print(products_prices)
        print(len(products_prices))

        #Give time to load
        time.sleep(2)

        #Get products links from page
        products_links = driver.find_elements(By.XPATH, "//h2[@class='ui-search-item__title ui-search-item__group__element']//a[1]")
        products_links = [ link.get_attribute('href') for link in products_links ]

        print("links")
        print(products_links)
        print(len(products_links))

        #Give time to load
        time.sleep(2)

        #Close browser
        driver.close()

        #Create dictionary for DF
        products_data = {
            "product_name": products_title,
            "product_price": products_prices,
            "product_link": products_links
        }

        #Get total rows
        #total_dic_rows = len(products_data)
        #print("Ttoal leng " + str(total_dic_rows))

        #Create dataframe with previous dictionary
        df = pd.DataFrame(products_data)
        print("DF len " + str(len(df)))

        if len(df) > 0:
            #Call functin to export data
            export_report(df, search_criteria)
        else:
            print("No se encontraron resultados para la busqueda, intenta nuevamente o busca con nuevos parametros")
        
        
def export_report(df, file_name):
    '''
    Function to export final dataframe to csv format
    '''
    df.to_csv("MercadoLibre_" + file_name + ".csv")

def isEmpty(val):
    '''
    Function to vlidate if value is empty
    '''
    flag = False
    if val == "" or val == " " or val == None:
        flag = True
    return flag

if __name__ == '__main__':
    '''
    Entry point of script
    '''
    start_search()