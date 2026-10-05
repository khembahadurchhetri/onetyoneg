ALTER TABLE "Contact" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'new';

CREATE TABLE "CareerApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CareerApplication_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topics" TEXT[] NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AdminAccount" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AdminAccount_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");
CREATE UNIQUE INDEX "AdminAccount_email_key" ON "AdminAccount"("email");

INSERT INTO "Course" ("id", "slug", "category", "title", "level", "price", "description", "topics", "updatedAt")
VALUES
    ('seed-course-ui-ux', 'ui-ux-visual-design', 'Design', 'UI/UX & Visual Design', 'Beginner to intermediate', 'NPR 5,000', 'Learn to turn ideas into clear, usable interfaces and polished visual assets for digital products.', ARRAY['Figma', 'Canva', 'Wireframes & prototypes', 'Design systems', 'Photoshop & Illustrator', 'Motion basics with After Effects'], CURRENT_TIMESTAMP),
    ('seed-course-frontend', 'frontend-component-development', 'Web development', 'Frontend & Component Development', 'Beginner to intermediate', 'NPR 5,000', 'Build responsive websites and reusable UI components, from the foundations through modern React workflows.', ARRAY['HTML & CSS', 'JavaScript', 'Responsive layouts', 'React', 'Reusable components', 'Accessibility'], CURRENT_TIMESTAMP),
    ('seed-course-fullstack', 'full-stack-web-development', 'Web development', 'Full-stack Web Development', 'Beginner to advanced', 'NPR 5,000', 'Follow a practical path from frontend interfaces to APIs, authentication, databases, and deployment.', ARRAY['MERN stack', 'Next.js', 'REST APIs', 'Authentication', 'React components', 'Deployment'], CURRENT_TIMESTAMP),
    ('seed-course-database', 'database-foundations', 'Data & databases', 'Database Foundations', 'Beginner to intermediate', 'NPR 5,000', 'Understand how to model, query, and connect application data using relational and document databases.', ARRAY['SQL fundamentals', 'MySQL', 'PostgreSQL', 'MongoDB', 'Schema design', 'Data in web apps'], CURRENT_TIMESTAMP),
    ('seed-course-cloud', 'cloud-devops-foundations', 'Cloud & operations', 'Cloud & DevOps Foundations', 'Beginner to intermediate', 'NPR 5,000', 'Get familiar with the tools and workflows used to ship, host, and maintain modern applications.', ARRAY['Linux basics', 'Git & GitHub', 'Docker', 'CI/CD', 'Cloud hosting', 'Monitoring & deployments'], CURRENT_TIMESTAMP),
    ('seed-course-project', 'project-management-digital-teams', 'Product & delivery', 'Project Management for Digital Teams', 'Beginner to intermediate', 'NPR 5,000', 'Plan and coordinate digital projects, communicate clearly, and guide work from requirements to delivery.', ARRAY['Agile & Scrum', 'Requirements', 'Task planning', 'Jira & boards', 'Team communication', 'Project delivery'], CURRENT_TIMESTAMP);

INSERT INTO "Service" ("id", "slug", "name", "detail", "price", "sortOrder", "updatedAt")
VALUES
    ('seed-service-web', 'websites-apps', 'Websites & apps', 'Custom sites and web apps, deployed with post-launch care and PWA support.', 'From NPR 10,000', 0, CURRENT_TIMESTAMP),
    ('seed-service-design', 'ui-ux-graphic-design', 'UI/UX & graphic design', 'Interface design, logos, pamphlets, and brand assets.', 'Quoted per project', 1, CURRENT_TIMESTAMP),
    ('seed-service-marketing', 'digital-marketing-seo', 'Digital marketing & SEO', 'Search visibility, social media, and content built around what you sell.', 'Quoted per project', 2, CURRENT_TIMESTAMP),
    ('seed-service-hospitality', 'hospitality-marketing', 'Hospitality marketing', 'Booking-ready websites and social presence for hotels and restaurants.', 'Quoted per project', 3, CURRENT_TIMESTAMP),
    ('seed-service-forms', 'government-forms-demat', 'Govt. forms & DEMAT help', 'Form filling for licenses, passports, and related applications, plus share market guidance.', 'Quoted per task', 4, CURRENT_TIMESTAMP),
    ('seed-service-cloud', 'cloud-domain-setup', 'Cloud & domain setup', 'Domain, hosting, and cloud configuration for your project.', 'Quoted per project', 5, CURRENT_TIMESTAMP);
