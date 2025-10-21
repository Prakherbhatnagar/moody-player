const mongoose = require('mongoose');

// Test MongoDB connection
async function testConnection() {
  try {
    console.log('🔗 Testing MongoDB connection...');
    
    // Replace YOUR_ACTUAL_PASSWORD with your real password
    const connectionString = 'mongodb+srv://prakherbhatnagar63:Rb5S8hESviKVyWFh@cluster0.f6cxzao.mongodb.net/moody-player?retryWrites=true&w=majority&appName=Cluster';
    
    await mongoose.connect(connectionString);
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    const testDoc = new TestModel({ name: 'Moody Player Test' });
    await testDoc.save();
    console.log('✅ Test document saved successfully!');
    
    // Clean up test document
    await TestModel.deleteOne({ name: 'Moody Player Test' });
    console.log('✅ Test document cleaned up!');
    
    await mongoose.disconnect();
    console.log('✅ MongoDB connection closed!');
    console.log('🎉 Your MongoDB is working perfectly!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if your password is correct');
    console.log('2. Make sure network access is allowed');
    console.log('3. Verify the connection string format');
  }
}

testConnection();
