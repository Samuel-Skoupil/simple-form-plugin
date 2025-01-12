<form id="simple-form-two" method="post">
    <!-- Krok 1 -->
    <div id="form-step-1" class="form visible">
        <div class="form-element">
            <label for="name">Name <span class="required">*</span></label>
            <input type="text" id="name" name="name" required placeholder="Enter your name">
        </div>

        <div class="form-element">
            <label for="last_name">Last Name <span class="required">*</span></label>
            <input type="text" id="last_name" name="last_name" required placeholder="Enter your last name">
        </div>

        <div class="form-element">
            <label for="email">Email <span class="required">*</span></label>
            <input type="text" id="email" name="email" required placeholder="Enter your email address">
        </div>

        <div class="form-element">
            <label for="phone_number">Phone Number</label>
            <input type="text" id="phone_number" name="phone_number" required placeholder="Enter your phone number">
        </div>
    </div>

    <!-- Tlačidlo prechod na ďalší krok -->
    <div class="button-container">
        <button class="next-step" type="button" onClick="show_next_page()">Next step</button>
    </div>

    <!-- Krok 2 -->
    <div id="form-step-2" class="form">
        <div class="form-element">
            <label for="state">State</label>
            <input type="text" id="state" name="state" placeholder="Enter your state">
        </div>

        <div class="form-element">
            <label for="city">City</label>
            <input type="text" id="city" name="city" placeholder="Enter your city">
        </div>

        <div class="form-element">
            <label for="date_of_birth">Date of Birth</label>
            <input type="date" id="date_of_birth" name="date_of_birth" placeholder="Enter your date of birth">
        </div>

        <div class="form-element">
            <label for="gender">Gender</label>
            <select id="gender" name="gender">
                <option value="" disabled selected hidden>Select your gender</option>
                <option value="other">Other</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
    </div>

    <!-- Tlačidlo odoslania formulára -->
    <div class="button-container">
        <button class="submit" type="submit">Submit</button>
    </div>
</form>