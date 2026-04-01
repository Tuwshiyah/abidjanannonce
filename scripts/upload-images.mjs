import { Client, Storage, ID } from "node-appwrite";
import fs from "fs";
import path from "path";
import { InputFile } from "node-appwrite/file";

const ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const PROJECT_ID = "69aeb58d002ea8abd6b5";
const API_KEY = "standard_c5e39f9040c1085117a13e7c320e48a3d525b3276d2c1c438d450ab598e5b6b9aa29eb258516d747ae5c117fe48ede62a5443753e562ac77f29a565a1c41a3d41e3cabf4fda32c128b9266214ae8e9640424dd6ac5508c62009c83c0b09b6da5d8a748a1f5ed23e228c9c76c174dcad9f15907eb79c84a336163754a3a64778a";
const BUCKET_ID = "product-images";

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const storage = new Storage(client);

const IMAGES_DIR = path.resolve("public/categories");

async function ensureBucket() {
    try {
        await storage.getBucket(BUCKET_ID);
        console.log(`Bucket "${BUCKET_ID}" exists.`);
    } catch {
        console.log(`Creating bucket "${BUCKET_ID}"...`);
        await storage.createBucket(BUCKET_ID, BUCKET_ID, undefined, undefined, undefined, undefined, ["role:all"], ["role:all"]);
        console.log("Bucket created.");
    }
}

async function uploadImages() {
    await ensureBucket();

    const files = fs.readdirSync(IMAGES_DIR).filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f));
    console.log(`Found ${files.length} images to upload.`);

    for (const file of files) {
        const filePath = path.join(IMAGES_DIR, file);
        const name = path.parse(file).name;

        try {
            // Use the category name as file ID for easy reference
            const fileId = name.replace(/[^a-zA-Z0-9_-]/g, "_");
            const inputFile = InputFile.fromPath(filePath, file);

            // Check if already exists
            try {
                await storage.getFile(BUCKET_ID, fileId);
                console.log(`⏭️  "${file}" already exists (ID: ${fileId}), skipping.`);
                continue;
            } catch {
                // File doesn't exist, upload it
            }

            const result = await storage.createFile(BUCKET_ID, fileId, inputFile);
            const url = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${result.$id}/view?project=${PROJECT_ID}`;
            console.log(`✅ Uploaded "${file}" → ID: ${result.$id}`);
            console.log(`   URL: ${url}`);
        } catch (err) {
            console.error(`❌ Failed to upload "${file}":`, err.message);
        }
    }

    console.log("\nDone! All images uploaded.");
}

uploadImages();
