from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
import time
import json
import pandas as pd

#Enter website
options = Options()
options.add_argument("--lang=en")
prefs = {
     "translate_whitelists": {"vi": "en"},
     "translate":{"enabled": "true"}
}
options.add_experimental_option("prefs", prefs)
cService = webdriver.ChromeService(executable_path='../chromedriver.exe')
driver = webdriver.Chrome(service =  cService, options=options)

time.sleep(3) # Adding this line worked for me
driver.get("https://topdev.vn/viec-lam-it")
time.sleep(1)
button = driver.find_element(By.ID, "btn-close-new-year-modal").click()
time.sleep(1)

# Get scroll height
last_height = driver.execute_script("return document.body.scrollHeight")

while True:
    # Scroll down to bottom
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    # Wait to load page
    # Scroll up to bottom of element 
    element = driver.find_element(By.CLASS_NAME,"bg-gray-light")
    actions = ActionChains(driver)
    actions.move_to_element(element).perform()
    time.sleep(3)
    
    # Calculate new scroll height and compare with last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height
    
#Get link company
def link():
    link = []
    elements = driver.find_elements(By.CLASS_NAME, "block")
    for element in elements:
    # Kiểm tra xem phần tử có class như mong đợi không
        if "h-[7.5rem]" in element.get_attribute("class") and "w-[10rem]" in element.get_attribute("class"):
        # Lấy thuộc tính href
            href = element.get_attribute("href")
            link.append(href)
    return link

def converdata(til, company,address, contract_type, requirement,Benefit, technical_skills, link_image, link):
    new_company_data = {
        "Title": til,
        "Company_name": company,
        "Address": address,
        "Contract_type": contract_type,
        "Requirement": requirement,
        "Benefit": Benefit,
        "Technical_skills": technical_skills,  # Consider replacing with the actual job link
        "Link_image": link_image,
        "URL": link,
    }
    return new_company_data

def get_data():
    tilte = driver.find_element(By.CSS_SELECTOR, "h1.text-2xl.font-bold.text-black").text
    company_name = driver.find_element(By.CSS_SELECTOR, "p.my-1.line-clamp-1.text-base.font-bold.text-gray-500").text
    address = driver.find_element(By.XPATH,"//div[contains(@class, 'w-11/12')]").text
    elements_contact = driver.find_elements(By.CSS_SELECTOR, ".item-card-info")[3]
    contact_type = "Negotiable"
    contact_xpath = elements_contact.find_elements(By.XPATH, ".//a[@href]")
    for c in contact_xpath:
        contact_type = c.text
        break
    elements = driver.find_elements(By.CSS_SELECTOR,".prose.max-w-full.text-sm.text-black.lg\\:text-base")
    if len(elements) < 3:    
        requirement = elements[0].text.replace("\n", "; ")
        benefit = elements[1].text.replace("\n", "; ")
    else:
        requirement = (elements[0].text + elements[1].text).replace("\n", "; ")
        benefit = elements[2].text.replace("\n", "; ")
    technical_skills = driver.find_element(By.CSS_SELECTOR, "div.flex.flex-wrap.gap-y-2").text.replace("\n", "; ")
    elements_image = driver.find_elements(By.ID,"detailJobHeader")
    for i in elements_image:
        link_image = i.find_element(By.TAG_NAME, "img").get_attribute("src")
    return converdata(tilte, company_name, address, contact_type, requirement, benefit, technical_skills, link_image, driver.current_url)

def complete_data(data, link):
    for index_link in link[1:]:
        driver.get(index_link)
        time.sleep(2)
        data_2 = get_data()
        data_2 = pd.DataFrame(data_2, index=[0])
        data = dataframe(data, data_2)
        driver.back()
    return data

def dataframe(data_1, data_2):
    new = pd.concat([data_1, data_2], ignore_index=True)
    return new


#Get data from the first link to create a template
first_link = link[0]
driver.get(first_link)
time.sleep(2)
data = get_data()
data = pd.DataFrame(data, index=[0])
driver.back()

topdev_data = complete_data(data,link)

topdev_data.to_csv("TopDev_data.csv", index=True, encoding='utf-8-sig')