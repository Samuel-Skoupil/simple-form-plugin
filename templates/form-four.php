<form id="simple-form-four" method="post">

    <!-- Step 1 -->
    <div id="form-step-1" class="form visible">
        <div class="step-indicator">
            <div class="step active">1</div>
            <div class="divider"></div>
            <div class="step">2</div>
            <div class="divider"></div>
            <div class="step">3</div>
            <div class="divider"></div>
            <div class="step">4</div>
        </div>

        <div class="border-bottom"></div>

        <div class="form-element">
            <label for="name">Name <span class="required">*</span></label>
            <input class="icon" type="text" id="name" name="name" required placeholder="Enter your name">
        </div>

        <div class="form-element">
            <label for="last_name">Last Name <span class="required">*</span></label>
            <input class="icon" type="text" id="last_name" name="last_name" required placeholder="Enter your last name">
        </div>
    </div>
    <div class="button-container">
        <button id="hide-button" class="next-step" type="button" onClick="show_next_page_four()">Next step</button>
    </div>

    <!-- Step 2 -->
    <div id="form-step-2" class="form">
        <div class="step-indicator">
            <div class="step active">1</div>
            <div class="divider-done"></div>
            <div class="step active">2</div>
            <div class="divider"></div>
            <div class="step">3</div>
            <div class="divider"></div>
            <div class="step">4</div>
        </div>

        <div class="border-bottom"></div>

        <div class="form-element">
            <label for="email">Email <span class="required">*</span></label>
            <input class="icon" type="text" id="email" name="email" required placeholder="Enter your email address">
        </div>

        <div class="form-element">
            <label for="phone_number">Phone Number</label>
            <input class="icon" type="text" id="phone_number" name="phone_number" placeholder="Enter your phone number">
        </div>
    </div>
    <div class="button-container">
        <button id="button-step-2" class="next-step hide" type="button" onClick="show_next_page_four()">Next step</button>
    </div>

    <!-- Step 3 -->
    <div id="form-step-3" class="form">
        <div class="step-indicator">
            <div class="step active">1</div>
            <div class="divider-done"></div>
            <div class="step active">2</div>
            <div class="divider-done"></div>
            <div class="step active">3</div>
            <div class="divider"></div>
            <div class="step">4</div>
        </div>

        <div class="border-bottom"></div>

        <div class="form-element">
            <label for="state">State</label>
            <input class="icon" type="text" id="state" name="state" placeholder="Enter your state">
        </div>

        <div class="form-element">
            <label for="city">City</label>
            <input class="icon" type="text" id="city" name="city" placeholder="Enter your city">
        </div>
    </div>
    <div class="button-container">
        <button id="hide-step-3" class="next-step hide" type="button" onClick="show_next_page_four()">Next step</button>
    </div>

    <!-- Step 4 -->
    <div id="form-step-4" class="form">
        <div class="step-indicator">
            <div class="step active">1</div>
            <div class="divider-done"></div>
            <div class="step active">2</div>
            <div class="divider-done"></div>
            <div class="step active">3</div>
            <div class="divider-done"></div>
            <div class="step active">4</div>
        </div>

        <div class="border-bottom"></div>

        <div class="form-element">
            <label for="date_of_birth">Date of Birth</label>
            <input class="icon" type="date" id="date_of_birth" name="date_of_birth" placeholder="Enter your date of birth">
        </div>

        <div class="form-element">
            <label for="gender">Gender</label>
            <select class="icon" id="gender" name="gender">
                <option value="" disabled selected hidden>Select your gender</option>
                <option value="other">Other</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
    </div>
    <div class="button-container">
        <button class="submit hide" type="submit" onClick="validateAndSubmit()">Submit</button>
    </div>

</form>