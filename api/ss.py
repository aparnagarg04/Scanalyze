import time
import pyautogui
import keyboard
import os
import base64
import subprocess
from pdf import create_pdf_from_images

def take_screenshot(filename):
    # Takes a screenshot and saves it with the specified filename
    screenshot = pyautogui.screenshot()
    screenshot.save(filename)

def visit_and_screenshot(url, index):
    # Open a new tab and visit the URL
    keyboard.press_and_release('ctrl+t')
    time.sleep(1)  # Give some time for the new tab to open

    # Type the URL and press Enter
    keyboard.write(url)
    keyboard.press_and_release('enter')
    time.sleep(9)  # Wait for the page to load

    # Take a screenshot after opening the page
    filename = f'images/page_{index}.png'
    take_screenshot(filename)
    print(f"Screenshot taken and saved as {filename}")

def open_edge_browser():
    # Path to edge browser executable
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
    # Open Brave browser
    subprocess.Popen([edge_path])

def convert_to_base64(output_pdf):
    with open(output_pdf, "rb") as pdf_file:
        # Read the binary content of the file
        pdf_data = pdf_file.read()
        
        # Encode the binary data to base64
        base64_encoded = base64.b64encode(pdf_data)
        
        # Convert bytes to a string (optional)
        base64_string = base64_encoded.decode('utf-8')
       
    return base64_string


def save_images(urls):
    # Create images directory if it doesn't exist
    if not os.path.exists('images'):
        os.makedirs('images')

    # Open Brave browser
    print("Opening Chrome browser...")
    open_edge_browser()
    time.sleep(5)  # Give some time for the browser to open

    
    # Loop through the list of URLs and take screenshots
    for index, url in enumerate(urls, start=1):
        visit_and_screenshot(url, index)

    images_folder = "images"  # Replace with your folder path
    output_pdf = "check.pdf"  # Output PDF file name

    # Call the function to create a PDF from images
    create_pdf_from_images(images_folder, output_pdf)
    return convert_to_base64(output_pdf)