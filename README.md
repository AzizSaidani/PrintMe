# PrintHub - Custom Printing E-commerce Platform
## Complete Setup and Usage Documentation

## Overview
PrintHub is a comprehensive e-commerce platform specifically designed for printing services. The application supports a wide range of printing services, from business cards to large-format banners, with separate interfaces for customers and administrators.

### Key Features
- Custom product configuration and ordering
- Real-time pricing calculator
- Order tracking and management
- File upload system for print materials
- Administrative dashboard for order processing
- Customer account management
- Secure payment processing

## Technical Architecture
The application is built using:
- Frontend: Angular framework
- Backend: Node.js with Express
- Database: MongoDB
- File Storage: AWS S3 (for customer uploads)

## Frontend Setup
1. Open a terminal
2. Clone the repository
3. Install dependencies and start the development server:
   ```bash
   npm install
   ng serve
   ```
4. Access the frontend at [http://localhost:4200](http://localhost:4200)

## Backend Setup
1. Open another terminal
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies and start the server:
   ```bash
   npm install
   node server.js
   ```
4. The backend will start handling requests

## User Roles and Access

### Customer Features
- Browse available printing services
- Upload design files
- Configure printing specifications
- Real-time price calculations
- Order tracking
- Order history
- Save favorite products
- Manage shipping addresses

### Admin Features
- Order management dashboard
- Production queue monitoring
- Customer management
- Product catalog management
- Pricing configuration
- File review and approval
- Order status updates
- Sales reports and analytics
- Inventory management



## Account Setup

### Customer Account
1. Visit the registration page
2. Fill in required information
3. Verify email address
4. Complete profile setup

### Admin Account
1. Register a client account first
2. Access the MongoDB database
3. Update the user document:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## Product Management
Administrators can:
- Add new product categories
- Set pricing rules
- Configure product options
- Manage production timeframes
- Set up shipping options
- Define material specifications

## Order Processing Workflow
1. Customer places order
2. Admin reviews uploaded files
3. Order moves to production queue
4. Production status updates
5. Shipping and delivery
6. Order completion

## Security Considerations
- JWT-based authentication
- File type validation
- Secure payment processing
- Role-based access control
- Data encryption
- Regular security audits

## Development Guidelines
- Follow Angular style guide
- Use TypeScript strictly
- Implement proper error handling
- Write unit tests
- Document API endpoints
- Follow Git workflow

## Support and Maintenance
- Regular backups
- System monitoring
- Performance optimization
- Customer support system
- Bug tracking and resolution

For additional support or questions, please contact the development team.

---

*Note: This documentation is subject to updates and improvements. Please check regularly for the latest version.*
