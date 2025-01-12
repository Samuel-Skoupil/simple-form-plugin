<form id="simple-form-two" method="post">

    <div id="form-step-1" class="form visible">
        <div class="form-element">
            <label for="name">Name <span class="required">*</span></label>
            <input type="text" id="name" name="name" required placeholder="Enter your name">
        </div>

        <div class="form-element">
            <label for="last_name">Last Name <span class="required">*</span></label>
            <input type="text" id="last_name" name="last_name" required placeholder="Enter your last name">
        </div>
    </div>

    <div class="button-container">
        <button class="next-step" type="button" onClick="show_next_page()">Next step</button>
    </div>


    <div id="form-step-2" class="form">
        <div class="form-element">
            <label for="email">Email <span class="required">*</span></label>
            <input type="text" id="email" name="email" required placeholder="Enter your email adress">
        </div>

        <div class="form-element">
            <label for="phone_number">Phone Number </label>
            <input type="text" id="phone_number" name="phone_number" required placeholder="Enter your phone number">
        </div>
    </div>

    <div class="button-container">
        <button class="submit" type="submit">Submit</button>
    </div>
</form>