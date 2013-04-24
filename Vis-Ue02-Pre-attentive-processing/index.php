<?php
include_once './design_head.php';

$testTypes = array();
$testTypes[] = "Colors";
$testTypes[] = "Shapes";
$testTypes[] = "Conjunction";
?>
<div class="page-header">
    <h1>How good is your pre-attentive processing?<br />
        <small>Choose a Test to find out</small></h1>
</div>
<div class="row" style="min-height: 400px;">
    <?php
    foreach ($testTypes as $type) :
        $typeLower = strtolower($type);
        ?>
        <div class="span4">
            <h3><?php echo $type ?></h3>

            <div class="well test-<?= $typeLower ?> preview">
            </div>
            <p>
                <span class="iconFont">[</span> ~ 2 Minutes
            </p>

            <a href="./test.php?type=<?= $typeLower ?>-easy" class="btn test">
                Time Trial
            </a><span id="passed-<?= $typeLower ?>-easy" class="passed iconFont"></span><br>
            <!-- <a href="./test.php?type=<?= $typeLower ?>-hard" class="btn test">
                Hard Test
            </a>-->
            <hr>
            <div>
                <h4>Results (Time Trial)</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Test
                            </th>
                            <th>
                                Config
                            </th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        for ($i = 1; $i <= 7; $i++) :
                            ?>
                            <tr>
                                <td>
                                    Test <?= $i ?>
                                </td>
                                <td>
                                    <svg version="1.2" baseProfile="tiny" style="float: left; width:20px; height: 20px;">
                                    <circle cx="10" cy="10" r="10" stroke="black" stroke-width="1" fill="#336699"></circle>
                                    </svg>
                                    <span id="<?= $typeLower ?>-<?= $i ?>-distr" style="float: left; margin-right: 10px;">: 10</span>
                                    <svg version="1.2" baseProfile="tiny" style="float: left; width:30px; height: 30px;">
                                    <circle cx="10" cy="10" r="10" stroke="black" stroke-width="1" fill="#336699"></circle>
                                    <rect x="10" y="10" width="20" height="20" stroke="black" stroke-width="1" fill="#b94a48"></rect>
                                    </svg>
                                    <span id="<?= $typeLower ?>-<?= $i ?>-distrTypes" style="float: left; margin-right: 10px;">: 10</span>

                                </td>
                                <td id="<?= $typeLower ?>-<?= $i ?>">
                                </td>
                            </tr>
                            <?php
                        endfor;
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    endforeach;
    ?>
</div>
<hr />
<div class="row">
    <h2>About</h2>
    Pre-attentive processing is done parallel and within a short time under a second.<br />
    With the given tests you can find out if the tested features are pre-attentive processed by you or not.<br />
    <hr />
    <h2>How does it Work</h2>
</div>

<?php
include_once './design_footer.php';
?>
<script>
    initOverviewPage();
</script>
