import os
from PIL import Image
from fpdf import FPDF

def create_pdf_from_images(images_folder, output_pdf):
    # Initialize a PDF object
    pdf = FPDF()
    
    # Supported image formats
    supported_formats = ('.png', '.jpg', '.jpeg', '.bmp', '.gif')

    # A4 dimensions in mm
    pdf_width = 210  # A4 width in mm
    pdf_height = 297  # A4 height in mm

    # Margins in mm (you can adjust this as per your need)
    margin = 10  # Margin from all sides
    content_width = pdf_width - 2 * margin
    content_height = (pdf_height - 3 * margin) / 2  # Space for 2 images on one page (3 margins: top, between, bottom)

    # Get list of all images in the folder
    image_files = [f for f in os.listdir(images_folder) if f.lower().endswith(supported_formats)]

    # Process images in pairs (2 images per page)
    for i in range(0, len(image_files), 2):
        # Add a new page
        pdf.add_page()
        
        # Loop for two images on the same page (top and bottom)
        for j in range(2):
            if i + j < len(image_files):
                image_path = os.path.join(images_folder, image_files[i + j])
                
                # Open the image using PIL
                image = Image.open(image_path)
                
                # Get image dimensions
                width, height = image.size
                aspect_ratio = width / height

                # Calculate the size of the image that fits within the content area (maintaining aspect ratio)
                if aspect_ratio > 1:
                    img_width = content_width
                    img_height = content_width / aspect_ratio
                else:
                    img_height = content_height
                    img_width = content_height * aspect_ratio

                # Make sure image doesn't exceed the content dimensions
                if img_width > content_width:
                    img_width = content_width
                    img_height = content_width / aspect_ratio
                if img_height > content_height:
                    img_height = content_height
                    img_width = content_height * aspect_ratio

                # Calculate the position to center the image (for both top and bottom positions)
                x = margin + (content_width - img_width) / 2
                if j == 0:  # Top image
                    y = margin
                else:  # Bottom image
                    y = 2 * margin + content_height

                # Insert the image at the calculated position
                pdf.image(image_path, x, y, img_width, img_height)

    # Output the PDF to a file
    pdf.output(output_pdf)
    print(f"PDF created successfully: {output_pdf}")

def main():
    # Path to the folder containing images
    images_folder = "images"  # Replace with your folder path
    output_pdf = "check.pdf"  # Output PDF file name

    # Call the function to create a PDF from images
    create_pdf_from_images(images_folder, output_pdf)

# if __name__ == "__main__":
#     main()
