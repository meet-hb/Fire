-- Drop and recreate for fresh state
DROP TABLE IF EXISTS site_content;

CREATE TABLE site_content (
    id SERIAL PRIMARY KEY,
    section_name VARCHAR(50) UNIQUE NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comprehensive Seeding
INSERT INTO site_content (section_name, content) VALUES
('navigation', '{
    "logo": "Firegard",
    "links": ["Home", "About", "Brands", "Products", "Videos", "Gallery", "Certifications", "Clients", "Contact"],
    "topBar": {
        "phone": "+61 8 0000 000",
        "email": "info@trustsafe.com",
        "address": "123 Fire Safety Way, Sydney"
    }
}'),
('hero', '{
    "tagline": "WELCOME TO TRUSTSAFE",
    "title": "Protecting lives with trusted fire safety",
    "description": "We provide end-to-end fire safety solutions, from smart detection to rapid suppression.",
    "image": "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1000",
    "badges": [
        {"title": "Global Standards", "subtitle": "ISO Certified"},
        {"title": "24/7 Support", "subtitle": "Always Active"}
    ]
}'),
('about', '{
    "title": "Over 30 Years of Experience",
    "subtitle": "Global Safety Leaders",
    "experience": "30+",
    "stats": [
        {"label": "Assets Protected", "value": "47B+"},
        {"label": "Satisfied Clients", "value": "12k+"}
    ]
}'),
('services', '[
    {"title": "Commercial Safety", "desc": "Integrated protection for business hubs.", "icon": "Building"},
    {"title": "Home Security", "desc": "Smart monitoring for modern homes.", "icon": "Home"}
]'),
('brands', '[
    {"name": "FireGard Pro", "logo": "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200&h=100&fit=crop"},
    {"name": "SafeTech", "logo": "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200&h=100&fit=crop"}
]'),
('videos', '[
    {"title": "Fire Safety Training", "thumb": "https://images.unsplash.com/photo-1542353436-312f0ee9429b?w=800&h=450&fit=crop"}
]'),
('gallery', '[
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1542353436-312f0ee9429b?w=500&h=500&fit=crop"
]'),
('certs', '[
    {"title": "ISO 9001:2015", "issuer": "Quality Management"}
]'),
('clients', '{
    "total": "4000+",
    "categories": [
        {"name": "Residential", "count": "2500+"},
        {"name": "Commercial", "count": "1200+"}
    ]
}'),
('footer', '{
    "copyright": "© 2024 Firegard. All Rights Reserved."
}');
