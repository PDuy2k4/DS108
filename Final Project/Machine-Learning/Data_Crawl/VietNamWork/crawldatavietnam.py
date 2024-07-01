from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException
import time
import pandas as pd

#enter website
custom_options = Options()
custom_options.add_argument("--lang=en")
prefs = {
     "translate_whitelists": {"vi": "en"},
     "translate":{"enabled": "true"}
}
custom_options.add_experimental_option("prefs", prefs)
cService = webdriver.ChromeService(executable_path='../chromedriver.exe')
driver = webdriver.Chrome(service =  cService, options=custom_options)

driver.get("https://www.vietnamworks.com/jobs?g=5")
time.sleep(3)

SCROLL_PAUSE_TIME = 2

def Get_scroll_height():
    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
    # Scroll down to bottom
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait to load page
        time.sleep(SCROLL_PAUSE_TIME)

    # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height


links = []
i = 2
exit_all_loops = False
# Vòng lặp ngoài
while not exit_all_loops:
    time.sleep(2)
    Get_scroll_height()
    elements = driver.find_elements(By.CLASS_NAME, 'img_job_card')
    # Lặp qua từng phần tử và trích xuất thuộc tính href
    hrefs = [element.get_attribute('href') for element in elements]
    # In ra tất cả các href
    for href in hrefs:
        links.append(href)   
    driver.get("https://www.vietnamworks.com/jobs?g=5&page=" + str(i))
    buttons = driver.find_elements(By.CSS_SELECTOR, '.page-item.btn-default')
    # Kiểm tra độ dài của danh sách phần tử
    num_buttons = len(buttons)
    i += 1
    if num_buttons < 5:
        exit_all_loops = True
        break
driver.get("https://www.vietnamworks.com/jobs?g=5")
driver.delete_all_cookies()

def converdata(til, company, location, requirement,Salary, technical_skills, link_image, link):
    new_company_data = {
        "Title": til,
        "Company_name": company,
        "Location": location,
        "Contract_type": "Full-time",
        "Requirement": requirement,
        "Salary": Salary,
        "Technical_skills": technical_skills,  # Consider replacing with the actual job link
        "Link_image": link_image,
        "URL": link,
    }
    return new_company_data

def get_data():
    #Title
    tilte = driver.find_element(By.CSS_SELECTOR, "h1.sc-ddjGPC.kGInQH").text
    
    #company_name
    parent_element = driver.find_element(By.CLASS_NAME,"sc-f8bc3bc5-0.dwwVnM")
    company_name = parent_element.find_element(By.CSS_SELECTOR,"a.sc-ddjGPC.dXDKBp.sc-dSCufp.ixLLjo").text
    
    #requirement
    requirement = ''
    elements = driver.find_elements(By.CLASS_NAME,"sc-b479783-2.bDMBkY")
    for element in elements:
        requirement += element.text
    requirement = requirement.replace('\n',' ')
    
    #location
    location = ''
    parent_element = driver.find_element(By.XPATH, "//h2[contains(text(), 'Job Locations')]")

    # Lấy tất cả các phần tử con của phần tử cha
    child_elements = parent_element.find_elements(By.XPATH,"./following-sibling::*")

    # Lặp qua từng phần tử con và lấy văn bản của mỗi phần tử
    for element in child_elements:
        location += element.text
        
    #salary
    salary = driver.find_element(By.CSS_SELECTOR, "span.sc-ddjGPC.gnZMiH").text
    
    # technical_skills
    technical_skills = ''
    parent_element = driver.find_element(By.XPATH,"//label[contains(text(), 'SKILL')]")
    # Lấy phần tử cha của phần tử "SKILL"
    parent_div = parent_element.find_element(By.XPATH,"./..")
    # Lấy tất cả các phần tử con của phần tử cha
    child_elements = parent_div.find_elements(By.XPATH,".//*")
    # Lặp qua từng phần tử con và lấy văn bản của mỗi phần tử
    for element in child_elements:
        technical_skills += element.text
    technical_skills = technical_skills.replace('\n',' ')
    
    #image_link
    elements = driver.find_elements(By.CSS_SELECTOR,".sc-f8bc3bc5-0.dwwVnM")
    # Lặp qua từng phần tử để lấy giá trị của thuộc tính "src" từ thẻ <img>
    for element in elements:
        # Lấy tất cả các thẻ <img> trong phần tử hiện tại
        images = element.find_elements(By.TAG_NAME,"img")
    # Lặp qua từng thẻ <img> và lấy giá trị của thuộc tính "src"
        for image in images:
            src_link = image.get_attribute("src")
            
    return converdata(tilte, company_name, location, requirement, salary, technical_skills, src_link, driver.current_url)

def dataframe(data_1, data_2):
    new = pd.concat([data_1, data_2], ignore_index=True)
    return new

def complete_data(data, links):
    for index_, index_link in enumerate(links[1:], start=1):
        try:
            time.sleep(3)
            driver.get(index_link)
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
            data_2 = get_data()
            data_2 = pd.DataFrame(data_2, index=[0])
            data = dataframe(data, data_2)
            driver.back()
        except (NoSuchElementException, StaleElementReferenceException) as e:
            driver.back()
            index_ -= 1
            index_link = links[index_]
    return data

#Get data from the first link to create a template
first_link = links[0]
driver.get(first_link)
time.sleep(3)
data = get_data()
data = pd.DataFrame(data, index=[0])
driver.back()

vietnamwork_data = complete_data(data, links)

vietnamwork_data.to_csv('vietnamwork_data.csv', index=True, encoding='utf-8-sig')