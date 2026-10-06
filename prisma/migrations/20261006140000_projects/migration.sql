CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "projectUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

INSERT INTO "Project" ("id", "title", "description", "category", "imageUrl", "imageAlt", "projectUrl", "sortOrder", "updatedAt")
VALUES
    ('seed-project-hamrobot', 'Hamrobot', 'A chat-based AI assistant interface.', 'AI assistant', '/projects/chatbot.jpeg', 'Hamrobot AI assistant chat interface', 'https://hamrobot.vercel.app', 0, CURRENT_TIMESTAMP),
    ('seed-project-shopco', 'ShopCo', 'A browsable product catalog and shopping experience.', 'E-commerce', '/projects/ecommerce.jpeg', 'ShopCo product catalog website', 'https://product-catalog-q88b.vercel.app', 1, CURRENT_TIMESTAMP),
    ('seed-project-nexus-secure', 'Nexus Secure', 'A cybersecurity brand and visual identity concept.', 'Cybersecurity', '/projects/cyber.jpg', 'Nexus Secure cybersecurity brand artwork', NULL, 2, CURRENT_TIMESTAMP),
    ('seed-project-byas', 'Byas Saving & Credit Co-operative', 'A logo created for Byas Saving & Credit Co-operative Ltd.', 'Brand identity', '/projects/byas logo.png', 'Byas Saving & Credit Co-operative Ltd. logo', NULL, 3, CURRENT_TIMESTAMP);
