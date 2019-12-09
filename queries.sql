--all columns and all rows from customers
select * from customers

-- we can pick the columns we want to see
select customerID, customername, country, city from customers

-- we can pick what category we want to see
select customerID, customername, country, city from customers
where country = "Germany"

-- sorting 
select customerID, customername, country, city 
from customers
order by country, city

-- descending by country and ascending by city
select customerID, customername, country, city 
from customers
order by country desc, city asc

--controlling how many records i get back 
select * from products
limit 5
--using offset to skip the first 10 and go to second page with pagination 
select * from products
order by price desc
limit 5 
offset 10


-- adding 
insert into products (productName, supplierId, categoryId, unit, price)
values ('cake', 7, 1, 'one', 20.99)

-- finding the cake 
select * from [products]
where productName like 'cake%'  --what is behind cake with %

select * from [products]
where productName like '%cake' --what is in front of cake with %

--update
update products 
set price = 24.99
where productId = 80

--do multple columns separated by commas 
update products 
set price = 24.99, unit = 'whole cake'
where productId = 80

-- to find update
select * from [products] order by 1 desc

--delete 
delete from [Products]
where productId = 80

-- to find the delete 
select * from [products] order by 1 desc