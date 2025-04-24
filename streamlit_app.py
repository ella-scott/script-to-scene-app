import streamlit as st
import openai
import os

# Set up environment (we'll use secrets on Streamlit Cloud)
openai.api_key = st.secrets["OPENAI_API_KEY"]

st.set_page_config(page_title="Script to Scene Generator", layout="centered")
st.title("🎬 Script to Scene Generator")

script = st.text_area("📜 Paste your script below:", height=200)
style = st.selectbox("🎨 Choose art style:", ["cinematic", "realistic", "sketch", "painting", "photorealistic"])

uploaded_img = st.file_uploader("📷 Upload reference image (optional)", type=["png", "jpg", "jpeg"])
email = st.text_input("📧 Enter your email to receive the image (optional)")

if st.button("🚀 Generate Scene"):
    if not script:
        st.warning("⚠️ Please enter a script.")
    else:
        with st.spinner("🎨 Generating image..."):
            try:
                prompt = f"Create a {style} image based on the scene: {script.strip()}"

                response = openai.images.generate(
                    model="dall-e-3",
                    prompt=prompt,
                    size="1024x1024",
                    quality="standard",
                    n=1
                )

                image_url = response.data[0].url

                st.subheader("📝 Final Prompt")
                st.write(prompt)

                st.subheader("🖼️ Scene Image")
                st.image(image_url, use_container_width=True)

                if email:
                    st.success(f"✅ Your image will be sent to {email} (email service not yet configured)")

            except Exception as e:
                st.error(f"❌ Error: {e}")
