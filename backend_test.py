"""
BOOSTER MAG Backend API Test Suite
Tests all API endpoints with proper error handling and reporting.
"""
import requests
import sys
from datetime import datetime

# Use the public endpoint from frontend/.env
BASE_URL = "https://rizz-preview-1.preview.emergentagent.com/api"
ADMIN_PASSWORD = "boostermag2026"

class APITester:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.failures = []
        self.admin_token = None
        self.test_order_id = None
        self.test_order_number = None

    def test(self, name, method, endpoint, expected_status, data=None, headers=None, params=None):
        """Run a single API test"""
        url = f"{BASE_URL}{endpoint}"
        self.tests_run += 1
        print(f"\n{'='*60}")
        print(f"Test {self.tests_run}: {name}")
        print(f"{'='*60}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)
            
            print(f"Request: {method} {url}")
            if params:
                print(f"Params: {params}")
            if data:
                print(f"Data: {data}")
            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED - Expected {expected_status}, got {response.status_code}")
                try:
                    resp_json = response.json()
                    print(f"Response: {resp_json}")
                    return True, resp_json
                except:
                    return True, {}
            else:
                self.tests_failed += 1
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.text}")
                except:
                    pass
                self.failures.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "endpoint": endpoint
                })
                return False, {}
                
        except Exception as e:
            self.tests_failed += 1
            print(f"❌ FAILED - Exception: {str(e)}")
            self.failures.append({
                "test": name,
                "error": str(e),
                "endpoint": endpoint
            })
            return False, {}

    def run_all_tests(self):
        """Run all backend API tests"""
        print("\n" + "="*60)
        print("BOOSTER MAG BACKEND API TEST SUITE")
        print("="*60)
        print(f"Base URL: {BASE_URL}")
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Test 1: Root endpoint
        self.test("Root API endpoint", "GET", "/", 200)
        
        # Test 2: Get packages - Instagram Followers
        success, data = self.test(
            "GET /api/packages - Instagram Followers",
            "GET",
            "/packages",
            200,
            params={"platform": "instagram", "service": "followers"}
        )
        if success:
            assert "tiers" in data, "Response missing 'tiers'"
            assert "quality_tiers" in data, "Response missing 'quality_tiers'"
            assert "delivery_speeds" in data, "Response missing 'delivery_speeds'"
            assert "upgrades" in data, "Response missing 'upgrades'"
            assert "subscriptions" in data, "Response missing 'subscriptions'"
            print("✓ All required fields present in packages response")
        
        # Test 3: Get packages - TikTok Likes
        self.test(
            "GET /api/packages - TikTok Likes",
            "GET",
            "/packages",
            200,
            params={"platform": "tiktok", "service": "likes"}
        )
        
        # Test 4: Get packages - TikTok Views
        self.test(
            "GET /api/packages - TikTok Views",
            "GET",
            "/packages",
            200,
            params={"platform": "tiktok", "service": "views"}
        )
        
        # Test 5: Get packages - Invalid platform/service
        self.test(
            "GET /api/packages - Invalid platform",
            "GET",
            "/packages",
            404,
            params={"platform": "invalid", "service": "followers"}
        )
        
        # Test 6: Create order
        test_email = f"test_{datetime.now().strftime('%H%M%S')}@example.com"
        success, order_data = self.test(
            "POST /api/orders - Create order",
            "POST",
            "/orders",
            200,
            data={
                "platform": "instagram",
                "service": "followers",
                "package_id": "2500",
                "quality_tier": "premium",
                "delivery_speed": "fast",
                "username": "testuser123",
                "email": test_email,
                "upgrades": ["instant", "bonus_likes"],
                "card_last4": "4242"
            }
        )
        if success:
            assert "order_number" in order_data, "Response missing 'order_number'"
            assert "base_price" in order_data, "Response missing 'base_price'"
            assert "total" in order_data, "Response missing 'total'"
            assert order_data["order_number"].startswith("BM-"), "Order number format incorrect"
            self.test_order_id = order_data.get("id")
            self.test_order_number = order_data.get("order_number")
            
            # Verify pricing calculation
            # Base: 19.99 * 1.35 (premium) = 26.99
            # Upgrades: 0.99 (instant) + 1.49 (bonus_likes) = 2.48
            # Total should be around 29.47
            expected_total = round(19.99 * 1.35 + 0.99 + 1.49, 2)
            actual_total = order_data.get("total", 0)
            print(f"✓ Order pricing: base_price={order_data.get('base_price')}, total={actual_total}, expected={expected_total}")
        
        # Test 7: Lookup order by order number
        if self.test_order_number:
            success, lookup_data = self.test(
                "GET /api/orders/lookup - By order number",
                "GET",
                "/orders/lookup",
                200,
                params={"order_number": self.test_order_number}
            )
            if success:
                assert "orders" in lookup_data, "Response missing 'orders'"
                assert len(lookup_data["orders"]) > 0, "No orders returned"
                order = lookup_data["orders"][0]
                assert "progress_pct" in order, "Order missing 'progress_pct'"
                assert "delivered_count" in order, "Order missing 'delivered_count'"
                assert "status" in order, "Order missing 'status'"
                print(f"✓ Order found: {order['order_number']}, status={order['status']}, progress={order['progress_pct']}%")
        
        # Test 8: Lookup order by email
        success, lookup_data = self.test(
            "GET /api/orders/lookup - By email",
            "GET",
            "/orders/lookup",
            200,
            params={"email": test_email}
        )
        if success:
            assert "orders" in lookup_data, "Response missing 'orders'"
            print(f"✓ Found {len(lookup_data['orders'])} order(s) for email")
        
        # Test 9: Lookup without params (should fail)
        self.test(
            "GET /api/orders/lookup - No params (should fail)",
            "GET",
            "/orders/lookup",
            400
        )
        
        # Test 10: Boost - Normal username
        success, boost_data = self.test(
            "POST /api/boost - Normal username",
            "POST",
            "/boost",
            200,
            data={"platform": "instagram", "username": "testuser"}
        )
        if success:
            assert "private" in boost_data, "Response missing 'private'"
            assert boost_data["private"] == False, "Should not be private"
            assert "amount" in boost_data, "Response missing 'amount'"
            print(f"✓ Boost successful: amount={boost_data.get('amount')}, private={boost_data.get('private')}")
        
        # Test 11: Boost - Private username
        success, boost_data = self.test(
            "POST /api/boost - Private username",
            "POST",
            "/boost",
            200,
            data={"platform": "instagram", "username": "myprivateaccount"}
        )
        if success:
            assert "private" in boost_data, "Response missing 'private'"
            assert boost_data["private"] == True, "Should be private"
            print(f"✓ Private account detected correctly: private={boost_data.get('private')}")
        
        # Test 12: Contact form
        success, contact_data = self.test(
            "POST /api/contact - Submit contact form",
            "POST",
            "/contact",
            200,
            data={
                "name": "Test User",
                "email": "test@example.com",
                "message": "This is a test message"
            }
        )
        if success:
            assert "success" in contact_data, "Response missing 'success'"
            assert contact_data["success"] == True, "Contact submission failed"
            print("✓ Contact form submitted successfully")
        
        # Test 13: Get stats
        success, stats_data = self.test(
            "GET /api/stats - Public stats",
            "GET",
            "/stats",
            200
        )
        if success:
            assert "orders" in stats_data, "Response missing 'orders'"
            assert "followers_delivered" in stats_data, "Response missing 'followers_delivered'"
            assert "creators" in stats_data, "Response missing 'creators'"
            print(f"✓ Stats: orders={stats_data.get('orders')}, followers={stats_data.get('followers_delivered')}, creators={stats_data.get('creators')}")
        
        # Test 14: Admin login - Wrong password
        self.test(
            "POST /api/admin/login - Wrong password",
            "POST",
            "/admin/login",
            401,
            data={"password": "wrongpassword"}
        )
        
        # Test 15: Admin login - Correct password
        success, login_data = self.test(
            "POST /api/admin/login - Correct password",
            "POST",
            "/admin/login",
            200,
            data={"password": ADMIN_PASSWORD}
        )
        if success:
            assert "token" in login_data, "Response missing 'token'"
            self.admin_token = login_data["token"]
            print(f"✓ Admin login successful, token received")
        
        # Test 16: Admin orders - Without token (should fail)
        self.test(
            "GET /api/admin/orders - Without token (should fail)",
            "GET",
            "/admin/orders",
            401
        )
        
        # Test 17: Admin orders - With token
        if self.admin_token:
            success, admin_orders = self.test(
                "GET /api/admin/orders - With token",
                "GET",
                "/admin/orders",
                200,
                headers={"Authorization": f"Bearer {self.admin_token}"}
            )
            if success:
                assert "orders" in admin_orders, "Response missing 'orders'"
                assert "summary" in admin_orders, "Response missing 'summary'"
                print(f"✓ Admin orders: {len(admin_orders['orders'])} orders, revenue=${admin_orders['summary'].get('revenue', 0)}")
        
        # Test 18: Admin orders - With status filter
        if self.admin_token:
            self.test(
                "GET /api/admin/orders - Filter by status",
                "GET",
                "/admin/orders",
                200,
                headers={"Authorization": f"Bearer {self.admin_token}"},
                params={"status": "pending"}
            )
        
        # Test 19: Admin update order - Without token (should fail)
        if self.test_order_id:
            self.test(
                "PATCH /api/admin/orders/{id} - Without token (should fail)",
                "PATCH",
                f"/admin/orders/{self.test_order_id}",
                401,
                data={"status": "completed"}
            )
        
        # Test 20: Admin update order - With token
        if self.admin_token and self.test_order_id:
            success, updated_order = self.test(
                "PATCH /api/admin/orders/{id} - Update status",
                "PATCH",
                f"/admin/orders/{self.test_order_id}",
                200,
                headers={"Authorization": f"Bearer {self.admin_token}"},
                data={"status": "completed"}
            )
            if success:
                assert updated_order.get("status") == "completed", "Status not updated"
                assert updated_order.get("progress_pct") == 100.0, "Progress should be 100% when completed"
                print(f"✓ Order updated: status={updated_order.get('status')}, progress={updated_order.get('progress_pct')}%")
        
        # Print summary
        self.print_summary()
        
        return self.tests_failed == 0

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed} ✅")
        print(f"Failed: {self.tests_failed} ❌")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failures:
            print("\n" + "="*60)
            print("FAILED TESTS:")
            print("="*60)
            for i, failure in enumerate(self.failures, 1):
                print(f"\n{i}. {failure['test']}")
                print(f"   Endpoint: {failure['endpoint']}")
                if 'expected' in failure:
                    print(f"   Expected: {failure['expected']}, Got: {failure['actual']}")
                if 'error' in failure:
                    print(f"   Error: {failure['error']}")
        
        print("\n" + "="*60)
        print(f"Completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*60)

def main():
    tester = APITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
