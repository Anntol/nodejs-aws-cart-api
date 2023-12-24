CREATE TYPE estatus AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE IF NOT EXISTS carts (
    id uuid PRIMARY key,
    user_id uuid not null,
    created_at date not null,
    updated_at date not null,
    status estatus
);

CREATE TABLE IF NOT EXISTS cart_items (
    cart_id uuid,
    product_id uuid,
    count int,
    FOREIGN KEY (cart_id)
      REFERENCES carts (id)
);

INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
('562aec72-83b4-4850-9151-48bcc691c2de', '678d9c4b-688e-4a66-a7a0-2f419936d5f4', '2023-12-20', '2023-12-21', 'OPEN'),
('34d840f7-c481-40dd-94ea-65d5df4b303b', '89e6b821-dde8-4701-b9b8-93cfbdd94806', '2023-12-21', '2023-12-22', 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count)
VALUES
('562aec72-83b4-4850-9151-48bcc691c2de', 'b5d55797-1f7a-4c26-9d2a-58a29313c7f1', 1),
('34d840f7-c481-40dd-94ea-65d5df4b303b', '7901f331-a6f7-453e-9153-b8a035ade178', 2),
('34d840f7-c481-40dd-94ea-65d5df4b303b', '8e4218d8-94ee-4651-ac65-caefa59dcd24', 3);